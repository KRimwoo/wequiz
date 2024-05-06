import { Meta, StoryObj } from '@storybook/react';
import AnswerArea from './AnswerArea';

const meta = {
  title: 'Components/AnswerArea',
  component: AnswerArea,
} satisfies Meta<typeof AnswerArea>;

export default meta;
type Story = StoryObj<typeof meta>;

export const MultipleChoice: Story = {
  args: {
    type: '객관식',
    options: [
      '엄청 길어서 라인이 넘어가는 문제입니다. 진짜 너무 길어서 1줄에는 다 보여줄 수가 없음 최소 2줄 넘어가야 하고 심하면 3줄 4줄까지 넘어가야 함 근데 레이아웃은 안바뀌어야 됨 진짜 어려운 작업',
      'B',
      'C',
      'D',
      'E',
    ],
    answer: 'A',
  },
};

export const FreeText: Story = {
  args: {
    type: '단답형',
    answer: 'A',
  },
};
