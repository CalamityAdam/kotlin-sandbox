package com.example.kotlinsandbox.repository

import com.example.kotlinsandbox.model.Post
import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.stereotype.Repository

@Repository
interface PostRepository: JpaRepository<Post, Long> {
    fun findByTitleContaining(title: String): List<Post>
}