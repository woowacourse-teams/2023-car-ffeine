package com.carffeine.carffeine.admin.common;

import java.util.List;

public record CustomPage<T>(
        int lastPage,
        List<T> elements
) {

}
