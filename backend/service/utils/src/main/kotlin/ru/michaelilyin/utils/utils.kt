package ru.michaelilyin.utils

import cz.jirutka.rsql.parser.RSQLParser
import cz.jirutka.rsql.parser.ast.AndNode
import cz.jirutka.rsql.parser.ast.ComparisonNode
import cz.jirutka.rsql.parser.ast.OrNode
import cz.jirutka.rsql.parser.ast.RSQLVisitor

/**
 * Created by micha on 04.03.2017.
 */
private class RSQLProcessor(
    private val nameMapper: ((String) -> String)? = null
) : RSQLVisitor<StringBuilder, StringBuilder> {

    override fun visit(node: ComparisonNode, param: StringBuilder): StringBuilder {
        val selector = nameMapper?.invoke(node.selector) ?: node.selector
        param.append(selector)
        val operator = when(node.operator.symbol) {
            "==" -> " = "
            else -> throw NotImplementedError(node.operator.symbol)
        }
        param.append(operator)
        if (node.arguments.size == 1) {
            param.append("'")
                .append(node.arguments[0])
                .append("'")
        }
        return param
    }

    override fun visit(node: OrNode, param: StringBuilder): StringBuilder {
        param.append("FALSE")
        node.children.forEach {
            param.append(" OR (")
            it.accept(this, param)
            param.append(")")
        }
        return param
    }

    override fun visit(node: AndNode, param: StringBuilder): StringBuilder {
        param.append("TRUE")
        node.children.forEach {
            param.append(" AND (")
            it.accept(this, param)
            param.append(")")
        }
        return param
    }

}

fun processFilter(filter: String, nameMapper: ((String) -> String)? = null): String {
    val ast = RSQLParser().parse(filter)
    val result = ast.accept(RSQLProcessor(nameMapper), StringBuilder("TRUE AND ("))
    return result.append(")").toString()
}
