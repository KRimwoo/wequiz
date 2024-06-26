'use client';
import React, { useEffect, useState } from 'react';
import * as styles from './page.css';
import ContentsBox from './_components/ContentsBox';
import TextInputField from '@/app/_components/TextInputField';
import FileUploadBox from './_components/FileUploadBox';
import { getExistQuiz, postRoom } from '@/app/_api/createRoom';
import { useRouter } from 'next/navigation';
import GradButton from '@/app/_components/GradButton';
import QuestionMaker from './_components/QuestionMaker/QuestionMaker';
import DropBox from './_components/DropBox/DropBox';
import useAuthStore from '@/app/_store/useAuthStore';

type ExistQuiz = {
  quizDocId: string;
  description: string;
  numberOfQuiz: number;
};

export default function CreateRoom() {
  const [isLoading, setIsLoading] = useState(false);
  const [files, setFiles] = useState<File[] | null>(null);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [numberOfParticipants, setNumberOfParticipants] = useState(1);
  const [numberOfProblems, setNumberOfProblems] = useState(5);
  const [qustionType, setQuestionType] = useState<'list' | 'create'>('create');
  const [existQuiz, setExistQuiz] = useState<ExistQuiz[]>([]);
  const [selectedList, setSelectedList] = useState<string | null>(null);
  const [isNumberUnable, setIsNumberUnable] = useState(false);
  const { accessToken } = useAuthStore();
  const router = useRouter();

  const handleNumberOfProblems = (numberOfProblems: number) => {
    setNumberOfProblems(numberOfProblems);
    setIsNumberUnable(true);
  };

  useEffect(() => {
    console.log(selectedList);
  }, [selectedList]);

  useEffect(() => {
    console.log(numberOfProblems);
  }, [numberOfProblems]);

  useEffect(() => {
    if (qustionType === 'list') {
      setIsNumberUnable(true);
      setFiles(null);
    } else {
      setIsNumberUnable(false);
      setSelectedList(null);
    }
  }, [qustionType]);

  const isFileSizeBigger = () => {
    const MAX_FILE_SIZE = 25 * 1024 * 1024;
    if (files?.some((file) => file.size > MAX_FILE_SIZE)) {
      alert('파일 크기는 25MB를 초과할 수 없습니다.');
      return true;
    }
    return false;
  };

  const fetchExistQuiz = async () => {
    const data = await getExistQuiz();
    setExistQuiz(data.existQuizList);
    console.log(accessToken);
    console.log(existQuiz);
  };

  useEffect(() => {
    if (accessToken) fetchExistQuiz();
  }, [accessToken]);

  const onSubmit = async () => {
    console.log(title);
    console.log(description);
    console.log(numberOfProblems);
    console.log(numberOfParticipants);
    console.log(files);
    console.log(selectedList);
    if (
      !title ||
      !description ||
      !numberOfParticipants ||
      (!files?.length && !selectedList)
    ) {
      alert(
        '방 제목, 설명, 인원 수, 문제 수, 문제 목록은 필수 입력 항목입니다.',
      );
      return;
    }
    if (isFileSizeBigger()) {
      return;
    }
    setIsLoading(true);
    try {
      const response = await postRoom(
        title,
        description,
        numberOfProblems,
        numberOfParticipants,
        files,
        selectedList,
      );
      console.log(response);
      if (response) {
        router.push(`enter-room/${response.roomId}?create=true`);
      }
    } catch (error: any) {
      alert(error.message);
    }
    setIsLoading(false);
  };

  return (
    <div className={styles.mainContainer}>
      <div className={styles.container}>
        <h1 className={styles.title}>방 만들기</h1>
        <div className={styles.contentsContainer}>
          <h1 className={styles.ContainerTitle}>설정</h1>
          {/* 방 제목 */}
          <div className={styles.contentsWrapper}>
            <ContentsBox imgSrc="/images/Home.svg" title="방 제목" />
            <div className={styles.defaultWrapper}>
              <TextInputField
                type="text"
                value={title}
                onChange={(e) => {
                  if (e.target.value.length <= 20) setTitle(e.target.value);
                }}
                borderRadius={12}
                maxLength={20}
              />
            </div>
          </div>

          {/* 설명 */}
          <div className={styles.contentsWrapper}>
            <ContentsBox imgSrc="/images/comment.svg" title="설명" />
            <div className={styles.defaultWrapper}>
              <TextInputField
                type="text"
                value={description}
                onChange={(e) => {
                  if (e.target.value.length <= 50)
                    setDescription(e.target.value);
                }}
                borderRadius={12}
                maxLength={50}
              />
            </div>
          </div>

          <div className={styles.dividedWrapper}>
            {/* 인원 수 */}
            <div className={styles.contentsWrapper}>
              <ContentsBox imgSrc="/images/Group_add.svg" title="인원 수" />
              <div className={styles.defaultWrapper}>
                <TextInputField
                  type="number"
                  value={String(numberOfParticipants)}
                  onChange={(e) => {
                    if (Number(e.target.value) > 10)
                      setNumberOfParticipants(10);
                    else setNumberOfParticipants(Number(e.target.value));
                  }}
                  borderRadius={12}
                />
              </div>
            </div>

            {/* 문제 수 */}
            <div className={styles.contentsWrapper}>
              <ContentsBox imgSrc="/images/Book_open_alt.svg" title="문제 수" />
              <div className={styles.defaultWrapper}>
                <div className={styles.radioButtonWrapper}>
                  <input
                    type="radio"
                    id="5"
                    name="numberOfProblems"
                    value={5}
                    onChange={() => setNumberOfProblems(5)}
                    disabled={isNumberUnable}
                    checked={numberOfProblems === 5}
                  />
                  <label htmlFor="5">5개</label>
                  <input
                    type="radio"
                    id="10"
                    name="numberOfProblems"
                    value={10}
                    disabled={isNumberUnable}
                    onChange={() => setNumberOfProblems(10)}
                    checked={numberOfProblems === 10}
                  />
                  <label htmlFor="10">10개</label>
                  <input
                    type="radio"
                    id="15"
                    name="numberOfProblems"
                    value={15}
                    disabled={isNumberUnable}
                    onChange={() => setNumberOfProblems(15)}
                    checked={numberOfProblems === 15}
                  />
                  <label htmlFor="15">15개</label>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className={styles.contentsContainer}>
          {/* 파일 업로드*/}
          <h1 className={styles.ContainerTitle}>문제 만들기</h1>

          <QuestionMaker
            questionType={qustionType}
            setQuestionType={setQuestionType}
          />
          {qustionType === 'list' ? (
            <DropBox
              List={existQuiz}
              setNumberOfProblems={handleNumberOfProblems}
              selectedList={selectedList}
              setSelectedList={setSelectedList}
            />
          ) : (
            <FileUploadBox setFiles={setFiles} />
          )}
        </div>
        <div className={styles.buttonContainer}>
          <div className={styles.buttonWrapper}>
            <GradButton
              rounded
              onClick={onSubmit}
              fullWidth
              isLoading={isLoading}
              disabled={isLoading}
            >
              생성하기
            </GradButton>
          </div>
        </div>
      </div>
    </div>
  );
}
