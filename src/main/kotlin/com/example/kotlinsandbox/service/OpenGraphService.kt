package com.example.kotlinsandbox.service

import org.jsoup.Jsoup
import org.springframework.stereotype.Service

@Service
class OpenGraphService {

    fun fetchOpenGraphData(url: String): Map<String, String> {
        val doc = Jsoup.connect(url).get()
        val metaTags = doc.getElementsByTag("meta")
        val ogData = mutableMapOf<String, String>()

        metaTags.forEach {
            val property = it.attr("property")
            if (property.startsWith("og:")) {
                ogData[property] = it.attr("content")
            }
        }
        return ogData
    }
}
