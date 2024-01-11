package com.carffeine.support;

import org.springframework.restdocs.mockmvc.MockMvcRestDocumentation;
import org.springframework.restdocs.mockmvc.RestDocumentationResultHandler;
import org.springframework.restdocs.operation.preprocess.Preprocessors;
import org.springframework.restdocs.snippet.Snippet;

public class RestDocsHelper {

    public static RestDocumentationResultHandler customDocument(String identifier, Snippet... snippets) {
        return MockMvcRestDocumentation.document("{class-name}/" + identifier,
                Preprocessors.preprocessRequest(Preprocessors.prettyPrint()),
                Preprocessors.preprocessResponse(Preprocessors.prettyPrint()),
                snippets
        );
    }
}
