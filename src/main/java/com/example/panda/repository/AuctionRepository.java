package com.example.panda.repository;

import com.example.panda.entity.AuctionEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AuctionRepository extends JpaRepository<AuctionEntity , Integer> {

}
