<?php declare(strict_types=1);

namespace Shopware\Tests\Unit\Core\Framework\Util;

use PHPUnit\Framework\TestCase;
use Shopware\Core\Framework\Rule\Exception\UnsupportedOperatorException;
use Shopware\Core\Framework\Rule\Rule;
use Shopware\Core\Framework\Util\ArrayComparator;

/**
 * @internal
 *
 * @covers \Shopware\Core\Framework\Util\ArrayComparator
 */
class ArrayComparatorTest extends TestCase
{
    /**
     * @dataProvider arrayMatchDataProvider
     *
     * @param array<string|int|bool|float> $a
     * @param array<string|int|bool|float> $b
     */
    public function testFloatMatch(string $operator, array $a, array $b, bool $expected): void
    {
        static::assertSame($expected, ArrayComparator::arrayMatch($operator, $a, $b));
    }

    public function testFloatMatchThrowException(): void
    {
        static::expectException(UnsupportedOperatorException::class);

        ArrayComparator::arrayMatch('>', [1], [2]);
    }

    /**
     * @return array{0: string, 1: array<string|int|bool|float>, 2: array<string|int|bool|float>, 3:bool}[]
     */
    public static function arrayMatchDataProvider(): array
    {
        return [
            [Rule::OPERATOR_NEQ, [1, 2], [3], true],
            [Rule::OPERATOR_NEQ, [1, 2], [1], false],
            [Rule::OPERATOR_EQ, [1, 2], [1], true],
            [Rule::OPERATOR_EQ, [1, 2], [3], false],
        ];
    }
}
