"use client";

import {useForm} from "react-hook-form";
import {Button, Input, Modal, Textarea} from "../ui";
import {TPoll, TCreatePoll, TPollOption} from "@/types";
import {Checkbox} from "../ui/checkbox";
import {useCreatePoll} from "@/hooks/api/poll/useCreatePoll";
import {MouseEvent, useState} from "react";
import {
  Calendar,
  CheckSquare,
  Pen, TextItalic,
  TrashBinMinimalistic
} from "@solar-icons/react";
import {useQueryClient} from "@tanstack/react-query";

export function CreatePollModal({
                                  isOpen,
                                  onClose,
                                  cityId,
                                }: {
  isOpen: boolean;
  onClose(): void;
  cityId: string;
}) {
  const queryClient = useQueryClient();
  const {register, handleSubmit, reset} = useForm<TPoll>();
  const [pollOptions, setPollOptions] = useState<string[]>([]);
  const [optionName, setOptionName] = useState<string>("");
  const onSubmit = async (formData: Omit<TCreatePoll, keyof TPollOption[]>) => {
    createPoll({formData, pollOptions});
    await queryClient.invalidateQueries({queryKey: ["polls", cityId]});
  };
  const onReset = async () => {
    reset();
    await queryClient.invalidateQueries({queryKey: ["polls", cityId]});
    onClose();
  };

  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [editingOptionIndex, setEditingOptionIndex] = useState<number | null>(null);

  const {createPoll} = useCreatePoll({
    onSuccess: onReset,
  });

  return (
    <Modal
      title="Create Poll"
      isOpen={isOpen}
      onClose={onClose}
    >
      <form
        className="flex flex-col gap-3"
        onSubmit={handleSubmit(onSubmit)}
      >
        <Input
          label="Title"
          icon={<TextItalic />} {...register("name")} />
        <Textarea
          label="Description"
          rows={3} {...register("description")} />

        <Input
          type="datetime-local"
          label="End date"
          icon={<Calendar />}
          min={new Date().toISOString()}
          {...register("endDate", {
            valueAsDate: true,
            min: {value: new Date().toISOString(), message: ""},
          })}
        />

        <label className="text-sm font-medium text-white mb-1 flex items-center justify-between ">
          Multiple choices
          <Checkbox {...register("isMultiple")} />
        </label>
        <label className="text-sm font-medium text-white mb-1 flex items-center justify-between ">
          Poll Options
        </label>
        {pollOptions.length ? (
          <ul className="flex flex-col gap-3 max-h-[200px] overflow-auto ">
            {pollOptions.map((option, index) => (
              <li key={index}>
                <div className="flex gap-2">
                  {
                    isEditing && editingOptionIndex === index ?
                      <Input
                        value={option}
                        onChange={(e) => setOptionName(e.target.value)}
                      />
                      :
                      <p className="flex-grow  px-3 py-2.5 border-2 border-gray-600 rounded-lg">
                        {option}
                      </p>}
                  {isEditing && editingOptionIndex === index ?
                    <Button
                      onClick={(e: MouseEvent) => {
                        e.preventDefault();
                        setIsEditing(false);
                        setEditingOptionIndex(null);
                      }}
                    ><CheckSquare /></Button> : <Button

                      onClick={(e: MouseEvent) => {
                        e.preventDefault();
                        setIsEditing(true);
                        setEditingOptionIndex(index);
                      }}
                    >
                      <Pen />
                    </Button>}
                  <Button
                    variant="danger"
                    onClick={(e: MouseEvent) => {
                      e.preventDefault();
                      setPollOptions(pollOptions.filter((i) => i !== option));
                    }}
                  >
                    <TrashBinMinimalistic />
                  </Button>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          "Create at least 2 options"
        )}
        <div className="gap-2 flex grow">
          <Input
            value={optionName}
            onChange={(e) => setOptionName(e.target.value)}
            disabled={isEditing}
          />
          <Button
            className="px-3"
            onClick={(e) => {
              e.preventDefault();
              if (!optionName.trim()) {
                return;
              }

              setPollOptions([...pollOptions, optionName]);
              setOptionName("");
            }}
          >
            <CheckSquare />
          </Button>
        </div>

        <div className="flex gap-2 justify-end">
          <Button
            variant="secondary"
            size="md"
            onClick={onReset}
          >
            Cancel
          </Button>
          <Button
            variant="primary"
            size="md"
            type="submit"
          >
            Create
          </Button>
        </div>
      </form>
    </Modal>
  );
}
