package com.carffeine.carffeine.helper;

import org.springframework.restdocs.mockmvc.RestDocumentationResultHandler;
import org.springframework.restdocs.snippet.Snippet;

import static org.springframework.restdocs.mockmvc.MockMvcRestDocumentation.document;
import static org.springframework.restdocs.operation.preprocess.Preprocessors.preprocessRequest;
import static org.springframework.restdocs.operation.preprocess.Preprocessors.preprocessResponse;
import static org.springframework.restdocs.operation.preprocess.Preprocessors.prettyPrint;

public class RestDocsHelper {
    public static RestDocumentationResultHandler customDocument(final String identifier, final Snippet... snippets) {
        return document("{class-name}/" + identifier,
                preprocessRequest(
                        prettyPrint()),
                preprocessResponse(
                        prettyPrint()),
                snippets
        );
    }
}
