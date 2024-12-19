<?php

namespace App\Filament\Resources\UserdetailsResource\Pages;

use App\Filament\Resources\UserdetailsResource;
use Filament\Actions;
use Filament\Resources\Pages\ListRecords;

class ListUserdetails extends ListRecords
{
    protected static string $resource = UserdetailsResource::class;

    protected function getHeaderActions(): array
    {
        return [
            Actions\CreateAction::make(),
        ];
    }
}
