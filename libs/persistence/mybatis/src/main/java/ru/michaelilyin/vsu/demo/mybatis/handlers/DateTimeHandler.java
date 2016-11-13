package ru.michaelilyin.vsu.demo.mybatis.handlers;

import org.apache.ibatis.type.BaseTypeHandler;
import org.apache.ibatis.type.JdbcType;
import org.apache.ibatis.type.MappedTypes;
import org.apache.ibatis.type.TypeHandler;
import org.joda.time.DateTime;
import org.joda.time.DateTimeZone;

import java.sql.*;

@MappedTypes(DateTime.class)
public class DateTimeHandler extends BaseTypeHandler {

    @Override
    public void setParameter(PreparedStatement preparedStatement, int columnIndex,
                             Object parameter, JdbcType jdbcType) throws SQLException {
        if (parameter != null) {
            preparedStatement.setTimestamp(columnIndex, new Timestamp(((DateTime) parameter).getMillis()));
        } else {
            preparedStatement.setTimestamp(columnIndex, null);
        }
    }

    @Override
    public Object getResult(ResultSet resultSet, String columnName) throws SQLException {
        Timestamp ts = resultSet.getTimestamp(columnName);
        return new DateTime(ts.getTime(), DateTimeZone.UTC);
    }

    @Override
    public Object getResult(ResultSet resultSet, int columnIndex) throws SQLException {
        Timestamp ts = resultSet.getTimestamp(columnIndex);
        return new DateTime(ts.getTime(), DateTimeZone.UTC);
    }

    @Override
    public Object getResult(CallableStatement callableStatement, int columnIndex) throws SQLException {
        Timestamp ts = callableStatement.getTimestamp(columnIndex);
        return new DateTime(ts.getTime(), DateTimeZone.UTC);
    }

    @Override
    public void setNonNullParameter(PreparedStatement preparedStatement, int columnIndex,
                                    Object parameter, JdbcType jdbcType) throws SQLException {
        preparedStatement.setTimestamp(columnIndex, new Timestamp(((DateTime) parameter).getMillis()));
    }

    @Override
    public Object getNullableResult(ResultSet resultSet, String columnName) throws SQLException {
        Timestamp ts = resultSet.getTimestamp(columnName);
        if (ts != null) {
            return new DateTime(ts.getTime(), DateTimeZone.UTC);
        } else {
            return null;
        }
    }

    @Override
    public Object getNullableResult(ResultSet resultSet, int columnIndex) throws SQLException {
        Timestamp ts = resultSet.getTimestamp(columnIndex);
        if (ts != null) {
            return new DateTime(ts.getTime(), DateTimeZone.UTC);
        } else {
            return null;
        }
    }

    @Override
    public Object getNullableResult(CallableStatement callableStatement, int columnIndex) throws SQLException {
        Timestamp ts = callableStatement.getTimestamp(columnIndex);
        if (ts != null) {
            return new DateTime(ts.getTime(), DateTimeZone.UTC);
        } else {
            return null;
        }
    }

}