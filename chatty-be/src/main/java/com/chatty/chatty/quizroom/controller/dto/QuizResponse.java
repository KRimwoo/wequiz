package com.chatty.chatty.quizroom.controller.dto;

import java.util.List;
import lombok.Builder;

@Builder
public record QuizResponse(

        Long id,

        String name,

        Integer numOfQuiz,

        Integer timeLimit,

        Integer playerNum,

        List<?> questions
) {
}
