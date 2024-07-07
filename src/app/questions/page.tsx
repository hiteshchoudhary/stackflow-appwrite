import { databases, users } from "@/models/server/config";
import { answerCollection, db, voteCollection, questionCollection } from "@/models/name";
import { Query } from "node-appwrite";
import React from "react";
import Link from "next/link";
import ShimmerButton from "@/components/magicui/shimmer-button";
import QuestionCard from "@/components/QuestionCard";
import { UserPrefs } from "@/store/Auth";
import Pagination from "@/components/Pagination";
import Search from "./Search";

const Page = async ({
    searchParams,
}: {
    searchParams: { page?: string; tag?: string; search?: string };
}) => {
    searchParams.page ||= "1";

    const queries = [
        Query.orderDesc("$createdAt"),
        Query.offset((+searchParams.page - 1) * 25),
        Query.limit(25),
    ];

    if (searchParams.tag) queries.push(Query.equal("tags", searchParams.tag));
    if (searchParams.search)
        queries.push(
            Query.or([
                Query.search("title", searchParams.search),
                Query.search("content", searchParams.search),
            ])
        );

    const questions = await databases.listDocuments(db, questionCollection, queries);
    console.log("Questions", questions)

    questions.documents = await Promise.all(
        questions.documents.map(async ques => {
            const [author, answers, votes] = await Promise.all([
                users.get<UserPrefs>(ques.authorId),
                databases.listDocuments(db, answerCollection, [
                    Query.equal("questionId", ques.$id),
                    Query.limit(1), // for optimization
                ]),
                databases.listDocuments(db, voteCollection, [
                    Query.equal("type", "question"),
                    Query.equal("typeId", ques.$id),
                    Query.limit(1), // for optimization
                ]),
            ]);

            return {
                ...ques,
                totalAnswers: answers.total,
                totalVotes: votes.total,
                author: {
                    $id: author.$id,
                    reputation: author.prefs.reputation,
                    name: author.name,
                },
            };
        })
    );

    return (
        <div className="container mx-auto px-4 pb-20 pt-36">
            <div className="mb-10 flex items-center justify-between">
                <h1 className="text-3xl font-bold">All Questions</h1>
                <Link href="/questions/ask">
                    <ShimmerButton className="shadow-2xl">
                        <span className="whitespace-pre-wrap text-center text-sm font-medium leading-none tracking-tight text-white dark:from-white dark:to-slate-900/10 lg:text-lg">
                            Ask a question
                        </span>
                    </ShimmerButton>
                </Link>
            </div>
            <div className="mb-4">
                <Search />
            </div>
            <div className="mb-4">
                <p>{questions.total} questions</p>
            </div>
            <div className="mb-4 max-w-3xl space-y-6">
                {questions.documents.map(ques => (
                    <QuestionCard key={ques.$id} ques={ques} />
                ))}
            </div>
            <Pagination total={questions.total} limit={25} />
        </div>
    );
};

export default Page;
