package ru.michaelilyin.utils

import com.winterbe.expekt.expect
import com.winterbe.expekt.should
import org.jetbrains.spek.api.Spek
import org.jetbrains.spek.api.dsl.describe
import org.jetbrains.spek.api.dsl.it
import org.jetbrains.spek.api.dsl.on

/**
 * Created by micha on 04.03.2017.
 */
object RsqlProcessorSpec : Spek({
    describe("RSQL processor") {
        val simpleComparision = "name == 'Test'"
        it("should return valid SQL for $simpleComparision") {
            expect(processFilter(simpleComparision)).to.equal("TRUE AND (name = 'Test')")
        }

        val simpleAnd = "name == 'Test';surname == 'Unit'"
        it("should return valid SQL for $simpleAnd") {
            expect(processFilter(simpleAnd)).to.equal("TRUE AND (TRUE AND (name = 'Test') AND (surname = 'Unit'))")
        }

        val simpleOr = "name == 'Test',surname == 'Unit'"
        it("should return valid SQL for $simpleOr") {
            expect(processFilter(simpleOr)).to.equal("TRUE AND (FALSE OR (name = 'Test') OR (surname = 'Unit'))")
        }
    }
})
