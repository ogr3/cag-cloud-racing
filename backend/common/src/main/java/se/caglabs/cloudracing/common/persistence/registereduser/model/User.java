package se.caglabs.cloudracing.common.persistence.registereduser.model;

import com.amazonaws.services.dynamodbv2.datamodeling.DynamoDBAttribute;
import com.amazonaws.services.dynamodbv2.datamodeling.DynamoDBHashKey;
import com.amazonaws.services.dynamodbv2.datamodeling.DynamoDBTable;
import lombok.Data;


@DynamoDBTable(tableName="registered-users-STAGE")
@Data
public class User {
    @DynamoDBHashKey(attributeName="name")
    private String name;
    @DynamoDBAttribute(attributeName="password")
    private String password;
    @DynamoDBAttribute(attributeName="type")
    private String type;
}
