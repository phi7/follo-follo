import { NextPage } from "next";
import * as React from "react";
import { useForm, useFieldArray, useWatch, Control } from "react-hook-form";

import { UseFormRegister } from "react-hook-form";
import { useAuthentication } from "../../hooks/authentication";
import searchFollow from "../../hooks/searchFollow";

enum followType {
  Follow,
  Follower,
}

interface Account {
  userName: string;
  followType: followType;
}

export interface UserForm {
  Accounts: Account[];
}

const InputList: NextPage = () => {
  const { user } = useAuthentication();

  const { handleSubmit, register, control } = useForm<UserForm>({
    defaultValues: {
      Accounts: [
        { userName: "", followType: followType.Follow },
        { userName: "", followType: followType.Follow },
      ],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "Accounts",
  });

  const addFollow = () => {
    append({ userName: "", followType: followType.Follow });
  };

  const removeFollow = (index: number) => {
    remove(index);
  };

  const doSubmit = (data: UserForm) => {
    // console.log("data", data);
    //breakしたいのでfor文
    for (let step = 0; step < data.Accounts.length; step++) {
      if (
        data.Accounts[step].userName == "" ||
        data.Accounts[step].followType == 0 ||
        data.Accounts[step].followType == undefined
      ) {
        window.alert("空欄があります！");
        break;
      }
      //このへんでapiを呼び出す
      searchFollow(data, user!, null);
    }
  };

  return (
    <div className="">
      <form
        onSubmit={handleSubmit(doSubmit)}
        className="flex flex-col justify-center items-center"
      >
        {fields.map((field, index) => (
          <div key={index} className="w-full">
            <AccountItem
              key={field.id}
              register={register}
              AccountIndex={index}
              removeFollow={removeFollow}
            />
            <div className="flex flex-row justify-center items-center w-full">
              かつ
            </div>
          </div>
        ))}

        <button onClick={addFollow} type={"button"} className="btn m-5">
          ＋
        </button>

        <button type="submit" className="btn m-5">
          検索結果を見る
        </button>
      </form>
    </div>
  );
};

export default InputList;

interface Props {
  register: UseFormRegister<UserForm>;
  AccountIndex: number;
  removeFollow: (index: number) => void;
}

const AccountItem = ({ register, AccountIndex, removeFollow }: Props) => {
  return (
    <div className="flex flex-row justify-center items-center w-full m-5">
      {/* <p>Follow {AccountIndex + 1}</p> */}
      <input
        type="text"
        className="input input-bordered w-full max-w-xs"
        placeholder="@から始まるユーザ名をいれてね"
        {...register(`Accounts.${AccountIndex}.userName` as const)}
      />
      <div>の</div>
      <select
        {...register(`Accounts.${AccountIndex}.followType` as const)}
        className="select w-full max-w-xs"
      >
        <option>フォロー</option>
        <option>フォロワー</option>
      </select>
      <button
        type={"button"}
        onClick={() => removeFollow(AccountIndex)}
        className="btn"
      >
        ×
      </button>
    </div>
  );
};
