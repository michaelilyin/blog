package ru.michaelilyin.blog

import org.springframework.boot.SpringApplication
import org.springframework.boot.autoconfigure.SpringBootApplication
import org.springframework.jdbc.core.JdbcTemplate
import org.springframework.transaction.PlatformTransactionManager
import org.springframework.jdbc.datasource.DataSourceTransactionManager
import org.apache.tomcat.jni.SSL.setPassword
import org.postgresql.ds.PGPoolingDataSource
import org.springframework.context.annotation.Bean
import org.springframework.jdbc.datasource.init.DataSourceInitializer
import org.springframework.jdbc.datasource.init.ResourceDatabasePopulator
import org.springframework.core.io.ClassPathResource
import javax.sql.DataSource


/**
 * Created by micha on 04.03.2017.
 */
fun main(args: Array<String>) {
    SpringApplication.run(Bootstrap::class.java, *args)
}

@SpringBootApplication
open class Bootstrap {

    @Bean
    open fun jdbcTemplate(dataSource: DataSource): JdbcTemplate {
        return JdbcTemplate(dataSource)
    }

    @Bean
    open fun transactionManager(dataSource: DataSource): PlatformTransactionManager {
        return DataSourceTransactionManager(dataSource)
    }

    @Bean
    open fun dataSource(): DataSource {
        val dataSource = PGPoolingDataSource()
        dataSource.url = System.getProperty("DB_HOST", "jdbc:postgresql://localhost:5432/blog")
        dataSource.user = System.getProperty("DB_LOGIN", "blog")
        dataSource.password = System.getProperty("DB_PASSWORD", "blog")
        return dataSource
    }

    @Bean
    open fun dataSourceInitializer(dataSource: DataSource): DataSourceInitializer {
        val dataSourceInitializer = DataSourceInitializer()
        dataSourceInitializer.setDataSource(dataSource)

//        val databasePopulator = ResourceDatabasePopulator()
//        databasePopulator.addScript(ClassPathResource("data.sql"))
//        dataSourceInitializer.setDatabasePopulator(databasePopulator)
//        dataSourceInitializer.setEnabled(java.lang.Boolean.parseBoolean(initDatabase))
        return dataSourceInitializer
    }
}
