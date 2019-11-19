package se.caglabs.cloudracing.common.persistence.session.model;

import com.amazonaws.services.dynamodbv2.datamodeling.DynamoDBAttribute;
import com.amazonaws.services.dynamodbv2.datamodeling.DynamoDBHashKey;
import com.amazonaws.services.dynamodbv2.datamodeling.DynamoDBTable;
import lombok.Data;
import lombok.NonNull;

@DynamoDBTable(tableName="sessions-STAGE")
@Data(staticConstructor = "of")
public class Session {
    @DynamoDBHashKey(attributeName = "token")
    @NonNull
    private String token;
    @DynamoDBAttribute(attributeName = "name")
    @NonNull
    private String userName;
}
