package com.example.panda.dto;


import com.example.panda.entity.WritingContentEntity;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class WritingContentDTO {
    private int wid;
    private byte[] content_img;
    private byte[] content_img1;
    private byte[] content_img2;

    public static WritingContentDTO toWritingContentDTO(WritingContentEntity writingContentEntity)
    {
        WritingContentDTO writingContentDTO = new WritingContentDTO();

        writingContentDTO.setWid(writingContentEntity.getWid());
        if(writingContentEntity.getContent_img() != null)
        {
            writingContentDTO.setContent_img((writingContentEntity.getContent_img()));
        }
        if(writingContentEntity.getContent_img1() != null)
        {
            writingContentDTO.setContent_img1((writingContentEntity.getContent_img1()));
        }
        if(writingContentEntity.getContent_img2() != null)
        {
            writingContentDTO.setContent_img2((writingContentEntity.getContent_img2()));
        }

        return writingContentDTO;
    }
}
