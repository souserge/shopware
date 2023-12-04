<?php declare(strict_types=1);

namespace Shopware\Core\Framework\Util;

use Shopware\Core\Framework\Log\Package;
use Shopware\Core\Framework\Rule\Exception\UnsupportedOperatorException;
use Shopware\Core\Framework\Rule\Rule;

#[Package('core')]
class ArrayComparator
{
    /**
     * @param array<string|int|bool|float> $actual
     * @param array<string|int|bool|float> $expected
     */
    public static function arrayMatch(string $operator, array $actual, array $expected): bool
    {
        return match ($operator) {
            Rule::OPERATOR_NEQ => \count(array_intersect($actual, $expected)) === 0,
            Rule::OPERATOR_EQ => \count(array_intersect($actual, $expected)) > 0,
            default => throw new UnsupportedOperatorException($operator, self::class),
        };
    }
}
