<?php

namespace App\Validator;

use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\HttpFoundation\RequestStack;
use Symfony\Component\Validator\Constraint;
use Symfony\Component\Validator\ConstraintValidator;

class UniqueDifferentValidator extends ConstraintValidator
{
    public function __construct(
        private RequestStack $requestStack,
        private EntityManagerInterface $em
    ) {}

    public function validate($receipt, Constraint $constraint): void
    {
        /* @var UniqueDifferent $constraint */

        // if (null === $value || '' === $value) {
        //     return;
        // }

        if (null === $constraint->field) {
            throw new \InvalidArgumentException('The "field" option must be set.');
        }

        $id = $this->requestStack->getCurrentRequest()->attributes->get('id');

        if (null === $id) {
            return;
        }

        $targetClassRep = $this->em->getRepository($constraint->class);
        $target = $targetClassRep->find($id);

        $sourceField = $this->getPropertyValue($receipt::class, $constraint->field, $receipt);
        $targetField = $this->getPropertyValue($target::class, $constraint->field, $target);
        
        if ($sourceField === $targetField) {
            return;
        }

        $existent = $targetClassRep->findOneBy([$constraint->field => $sourceField]);

        if (null == $existent) {
            return;
        }

        $this->context->buildViolation($constraint->message)
            ->setParameter('{{ value }}', $sourceField)
            ->setParameter('{{ field }}', $constraint->field)
            ->addViolation();
    }

    private function getPropertyValue(string $class, string $name, mixed $object): mixed
    {
        $property = new \ReflectionProperty($class, $name);

        return $property->getValue($object);
    }
}
