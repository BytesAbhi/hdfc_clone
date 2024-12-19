<?php

namespace App\Filament\Resources\UserdetailsResource\Pages;

use App\Filament\Resources\UserdetailsResource;
use Filament\Actions;
use Filament\Resources\Pages\ViewRecord;

class ViewUserdetails extends ViewRecord
{
    protected static string $resource = UserdetailsResource::class;

    protected function getHeaderActions(): array
    {
        return [
            Actions\EditAction::make(),
        ];
    }
}
