package com.carffeine.carffeine.helper.integration;

import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.test.context.TestContext;
import org.springframework.test.context.support.AbstractTestExecutionListener;

import java.util.List;

public class IntegrationTestHelper extends AbstractTestExecutionListener {

    @Override
    public void afterTestMethod(TestContext testContext) throws Exception {
        JdbcTemplate jdbcTemplate = testContext.getApplicationContext().getBean(JdbcTemplate.class);

        List<String> truncateAllQueries = getQueriesForTruncateAllTables(jdbcTemplate);
        executeTruncateTables(jdbcTemplate, truncateAllQueries);
    }

    private void executeTruncateTables(JdbcTemplate jdbcTemplate, List<String> truncateAllTablesQuery) {
        jdbcTemplate.execute("SET FOREIGN_KEY_CHECKS = 0");

        for (String truncateQuery : truncateAllTablesQuery) {
            jdbcTemplate.execute(truncateQuery);
        }

        jdbcTemplate.execute("SET FOREIGN_KEY_CHECKS = 1");
    }

    private List<String> getQueriesForTruncateAllTables(JdbcTemplate jdbcTemplate) {
        return jdbcTemplate.queryForList("SELECT CONCAT('TRUNCATE TABLE ', TABLE_NAME, ';') AS q FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_SCHEMA = 'PUBLIC'", String.class);
    }
}
