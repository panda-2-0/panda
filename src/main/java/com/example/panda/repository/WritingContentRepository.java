package com.example.panda.repository;

import com.example.panda.entity.WritingContentEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface WritingContentRepository extends JpaRepository<WritingContentEntity , Integer> {
}
