<?php

namespace App\Filament\Resources\UserstatementResource\Pages;

use App\Filament\Resources\UserstatementResource;
use Filament\Actions;
use Filament\Resources\Pages\ListRecords;

class ListUserstatements extends ListRecords
{
    protected static string $resource = UserstatementResource::class;

    protected function getHeaderActions(): array
    {
        return [
            Actions\CreateAction::make(),
        ];
    }
}
