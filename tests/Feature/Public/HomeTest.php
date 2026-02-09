<?php

it('exibe a página inicial', function () {
    $this->get(route('home'))->assertOk();
});
