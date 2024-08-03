<?php

namespace App\Validator;

use Symfony\Component\Validator\Constraint;

/**
 * @Annotation
 * @Target({"PROPERTY", "METHOD", "ANNOTATION"})
 */
#[\Attribute]
class UniqueDifferent extends Constraint
{
    /*
     * Any public properties become valid options for the annotation.
     * Then, use these in your validator class.
     */
    public string $message;

    public string $field;

    public string $class;

    public function __construct(
        ?string $field = null,
        ?string $class = null,
        ?string $message = 'El valor "{{ value }}" ya existe para la propiedad "{{ field }}"',
        ?array $groups = null,
        $payload = null,
        array $options = []
    ) {
        parent::__construct($options, $groups, $payload);
        $this->message = $message;
        $this->field = $field;
        $this->class = $class;
    }

    public function getTargets(): string
    {
        return self::CLASS_CONSTRAINT;
    }
}
