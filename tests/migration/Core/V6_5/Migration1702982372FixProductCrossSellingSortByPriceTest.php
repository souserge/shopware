<?php declare(strict_types=1);

namespace Shopware\Tests\Migration\Core\V6_5;

use Doctrine\DBAL\Connection;
use PHPUnit\Framework\TestCase;
use Shopware\Core\Content\Product\Aggregate\ProductCrossSelling\ProductCrossSellingEntity;
use Shopware\Core\Content\Test\Product\ProductBuilder;
use Shopware\Core\Framework\Context;
use Shopware\Core\Framework\DataAbstractionLayer\EntityRepository;
use Shopware\Core\Framework\DataAbstractionLayer\Search\Criteria;
use Shopware\Core\Framework\Test\TestCaseBase\DatabaseTransactionBehaviour;
use Shopware\Core\Framework\Test\TestCaseBase\KernelTestBehaviour;
use Shopware\Core\Framework\Test\TestDataCollection;
use Shopware\Core\Framework\Uuid\Uuid;
use Shopware\Core\Migration\V6_5\Migration1702982372FixProductCrossSellingSortByPrice;

/**
 * @internal
 *
 * @covers \Shopware\Core\Migration\V6_5\Migration1702982372FixProductCrossSellingSortByPrice
 */
class Migration1702982372FixProductCrossSellingSortByPriceTest extends TestCase
{
    use DatabaseTransactionBehaviour;
    use KernelTestBehaviour;

    public function testMigrationChangesSortBy(): void
    {
        $ids = new TestDataCollection();
        $context = Context::createDefaultContext();

        /** @var EntityRepository $productRepository */
        $productRepository = $this->getContainer()->get('product.repository');
        $productRepository->create([
            (new ProductBuilder($ids, 'a'))->price(15, 10)->visibility()->build(),
        ], $context);

        $crossSellingId = Uuid::randomHex();

        /** @var EntityRepository $crossSellingRepository */
        $crossSellingRepository = $this->getContainer()->get('product_cross_selling.repository');
        $crossSellingRepository->create([[
            'id' => $crossSellingId,
            'name' => 'test',
            'productId' => $ids->get('a'),
            'type' => 'productStream',
            'sortBy' => 'price',
        ]], $context);

        $migration = new Migration1702982372FixProductCrossSellingSortByPrice();
        $migration->update($this->getContainer()->get(Connection::class));

        /** @var ProductCrossSellingEntity $productCrossSelling */
        $productCrossSelling = $crossSellingRepository->search(new Criteria([$crossSellingId]), $context)->first();

        static::assertEquals('cheapestPrice', $productCrossSelling->getSortBy());
    }
}
