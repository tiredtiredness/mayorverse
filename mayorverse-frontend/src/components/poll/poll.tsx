"use client";

import {useState} from "react";
import {TPoll, TPollOption} from "@/types";
import {Button} from "../ui/button";
import {CheckSquare} from "@solar-icons/react";
import {useAuth} from "@/hooks";
import {useCreateVote} from "@/hooks/api/vote/useCreateVote";

export function Poll({poll}: { poll: TPoll }) {
  const {user} = useAuth();
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);
  const totalVotes = poll?.votes.map((vote) => vote.userId).length;
  const totalUniqueVotes = new Set(poll?.votes.map((vote) => vote.userId)).size;
  const [hasVoted, setHasVoted] = useState(
    !!poll?.votes.find((item) => item.userId === user?.id),
  );
  const {createVote} = useCreateVote();

  const handleVote = () => {
    if (selectedOptions.length === 0) return;
    if (user) {
      createVote({
        userId: user.id,
        pollId: poll.id,
        pollOptionIdList: selectedOptions,
      });
    }
    setHasVoted(true);
  };

  const toggleOption = (optionId: string) => {
    if (hasVoted) return;

    if (poll.isMultiple) {
      setSelectedOptions((prev) =>
        prev.includes(optionId)
          ? prev.filter((id) => id !== optionId)
          : [...prev, optionId],
      );
    } else {
      setSelectedOptions([optionId]);
    }
  };

  return (
    <div className="bg-gray-800 border border-gray-700 rounded-xl shadow-lg p-5 text-white">
      <div>
        <h3 className="text-xl font-semibold text-white break-all">{poll.name}</h3>
        <p className="text-gray-400 text-sm mt-1 break-all ">
          {poll.description}
        </p>
        <div className="flex justify-between text-xs text-gray-500 mt-2">
          <span>Created: {new Date(poll.createdAt).toLocaleDateString()}</span>
          <span>
            Ends:{" "}
            {poll.endDate
              ? new Date(poll.endDate).toLocaleDateString()
              : "no end date"}
          </span>
        </div>
      </div>

      <div>
        <div className="space-y-3 mb-4">
          {poll?.pollOptions?.map((option: TPollOption) => (
            <div key={option.id}>
              <button
                onClick={() => toggleOption(option?.id)}
                disabled={hasVoted}
                className={`
                  w-full px-3 py-2 text-left rounded-lg border group transition-colors
                  ${
                  selectedOptions.includes(option.id)
                    ? "border-teal-500 bg-teal-900/30"
                    : "border-gray-700 hover:bg-gray-700/50"
                }
                  ${hasVoted ? "cursor-default" : "cursor-pointer"}
                `}
              >
                <div className="flex justify-between items-center ">
                  <span>{option?.name}</span>
                  <CheckSquare className=" hidden group-hover:block" />
                  {hasVoted && (
                    <span className="text-teal-400 font-medium">
                      {Math.round(
                        ((poll.votes
                            .map((vote) => vote.pollOptionId)
                            .filter((pollOptionId: string) => pollOptionId === option.id)
                            .length || 0) /
                          (totalVotes || 1)) *
                        100,
                      )}
                      %
                    </span>
                  )}
                </div>

                {hasVoted && (
                  <div className="w-full bg-gray-700 rounded-full h-1.5 mt-2">
                    <div
                      className="bg-teal-500 h-1.5 rounded-full"
                      style={{
                        width: `${
                          ((poll.votes
                              .map((vote) => vote.pollOptionId)
                              .filter(
                                (pollOptionId: string) => pollOptionId === option.id,
                              ).length || 0) /
                            (totalVotes || 1)) *
                          100
                        }%`,
                      }}
                    />
                  </div>
                )}
              </button>
            </div>
          ))}
        </div>

        {!hasVoted ? (
          <Button
            onClick={handleVote}
            disabled={selectedOptions?.length === 0}
            className="w-full bg-teal-600 hover:bg-teal-700"
          >
            Submit Vote
          </Button>
        ) : (
          <div className="text-center py-2 text-teal-400 font-medium">
            Thanks for voting!
          </div>
        )}

        <div className="mt-3 text-xs text-gray-400 flex justify-between">
          <span>
            {poll.isMultiple
              ? "Multiple selections allowed"
              : "Single selection only"}
          </span>
          <span>{totalUniqueVotes} votes total</span>
        </div>
      </div>
    </div>
  );
}
