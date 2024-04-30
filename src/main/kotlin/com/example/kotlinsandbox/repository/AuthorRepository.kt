package com.example.kotlinsandbox.repository

import com.example.kotlinsandbox.model.Author
import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.stereotype.Repository

@Repository
interface AuthorRepository : JpaRepository<Author, Long> {
    fun findByName(name: String): List<Author>
}