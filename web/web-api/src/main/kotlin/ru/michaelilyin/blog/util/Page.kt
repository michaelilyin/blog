package ru.michaelilyin.blog.util

/**
 * TODO: javadoc
 * Created by Michael Ilyin on 15.11.2016.
 */
data class Page<T>(val elements: List<T>,
                   val total: Int) {
}