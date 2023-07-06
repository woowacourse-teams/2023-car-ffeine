package com.carffeine.carffeine.config;

import org.jasypt.encryption.StringEncryptor;
import org.jasypt.encryption.pbe.PooledPBEStringEncryptor;
import org.jasypt.encryption.pbe.config.SimpleStringPBEConfig;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.io.BufferedReader;
import java.io.FileReader;
import java.io.IOException;
import java.util.List;

@Configuration
public class JasyptConfig {

    private static final int KEY_LINE = 0;
    private final String encryptKey;

    public JasyptConfig() {
        try {
            String path = getClass().getClassLoader().getResource("encryptKey.txt").getPath();
            BufferedReader bufferedReader = new BufferedReader(new FileReader(path));
            List<String> lines = bufferedReader.lines().toList();
            encryptKey = lines.get(KEY_LINE);
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
    }

    @Bean(name = "jasyptEncryptor")
    public StringEncryptor stringEncryptor() {
        PooledPBEStringEncryptor encryptor = new PooledPBEStringEncryptor();

        SimpleStringPBEConfig config = new SimpleStringPBEConfig();

        config.setPassword(encryptKey);
        config.setAlgorithm("PBEWithMD5AndDES");
        config.setKeyObtentionIterations(1000);
        config.setPoolSize(1);
        config.setSaltGeneratorClassName("org.jasypt.salt.RandomSaltGenerator");
        config.setStringOutputType("base64");
        encryptor.setConfig(config);
        return encryptor;
    }
}
