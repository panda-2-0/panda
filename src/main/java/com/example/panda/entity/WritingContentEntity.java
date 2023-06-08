package com.example.panda.entity;

import com.example.panda.dto.WritingContentDTO;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;



@Setter
@Getter
@Entity
@Table(name = "Writing_content")
public class WritingContentEntity {
    @Id
    private int wid;
    @Builder.Default
    private byte[] content_img = null;
    @Builder.Default
    private byte[] content_img1 = null;
    @Builder.Default
    private byte[] content_img2 = null;

    public static WritingContentEntity toWritingContentEntity(WritingContentDTO writingContentDTO)
    {
        WritingContentEntity writingContentEntity = new WritingContentEntity();

        if(writingContentDTO.getContent_img() != null)
        {
            writingContentEntity.setContent_img(writingContentDTO.getContent_img());
        }
        if(writingContentDTO.getContent_img1() != null)
        {
            writingContentEntity.setContent_img1(writingContentDTO.getContent_img1());
        }
        if(writingContentDTO.getContent_img2() != null)
        {
            writingContentEntity.setContent_img2(writingContentDTO.getContent_img2());
        }

        return writingContentEntity;
    }
}

