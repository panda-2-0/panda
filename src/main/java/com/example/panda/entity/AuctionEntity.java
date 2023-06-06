package com.example.panda.entity;

import com.example.panda.dto.AuctionDTO;
import com.example.panda.dto.WritingDTO;
import jakarta.persistence.*;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Entity
@Getter
@Setter
@Table(name = "Auction")
public class AuctionEntity {
    @Id
    private int writing_Id;
    @Column
    private LocalDateTime auction_date;
    @Column
    private int highest_value;
    @Column
    private int buy_now;
    @ManyToOne
    @JoinColumn(name = "email")
    private UserEntity userEntity;

    public static AuctionEntity toAuctionEntity(AuctionDTO auctionDTO){
        AuctionEntity auctionEntity=new AuctionEntity();

        auctionEntity.setAuction_date(auctionDTO.getAuction_date());
        auctionEntity.setBuy_now(auctionDTO.getBuy_now());
        auctionEntity.setHighest_value(auctionDTO.getHighest_value());


        return auctionEntity;
    }


}
