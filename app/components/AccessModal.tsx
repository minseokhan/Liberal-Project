"use client";

import { useState } from "react";
import { SafeLiberal } from "../types";
import Input from "./input/Input";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import axios from "axios";
import toast from "react-hot-toast";

interface AccessModalProps {
  modalOpen: boolean;
  onModalClose: () => void;
}

const AccessModal: React.FC<AccessModalProps> = ({
  modalOpen,
  onModalClose,
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FieldValues>({
    defaultValues: {
      accessPwd: "",
    },
  });

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    setIsLoading(true);

    axios
      .post("/api/access", data)
      .then((res) => {
        if (res.data.ok) {
          toast.success(res.data.message);
          reset();
          onModalClose();
        } else {
          toast.error(res.data.message);
          reset();
        }
      })
      .catch((error) => {
        toast.error(error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const handleOnKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSubmit(onSubmit)();
    }
  };

  return (
    <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none bg-neutral-900/90">
      <div className="relative w-full md:w-4/6 lg:w-3/6 xl:w-1/4 mx-auto">
        <div
          className={`
              translate
              relative
              ${modalOpen ? "translate-y-0" : "translate-y-full"}
              ${modalOpen ? "opacity-100" : "opacity-0"}
            `}
        >
          <div className="relative w-full bg-white flex flex-col items-center gap-5 rounded-md px-6 py-8">
            <p className="text-blue7 text-xl font-semibold">관리자 권한 인증</p>
            <Input
              id="accessPwd"
              placeholder="관리자 접근 번호를 입력한 뒤 엔터를 눌러주세요..."
              type="password"
              register={register}
              disabled={isLoading}
              onKeyPress={handleOnKeyPress}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccessModal;
