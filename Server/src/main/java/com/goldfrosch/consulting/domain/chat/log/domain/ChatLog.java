package com.goldfrosch.consulting.domain.chat.log.domain;

import lombok.Data;
import lombok.Getter;
import lombok.Setter;
import org.springframework.data.mongodb.core.mapping.Document;

@Data
@Getter
@Setter
@Document(collection = "log")
public class ChatLog {
}
