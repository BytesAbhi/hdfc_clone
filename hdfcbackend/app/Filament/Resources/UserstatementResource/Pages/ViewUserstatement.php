<?php

namespace App\Filament\Resources\UserstatementResource\Pages;

use App\Filament\Resources\UserstatementResource;
use Filament\Actions;
use Filament\Resources\Pages\ViewRecord;

class ViewUserstatement extends ViewRecord
{
    protected static string $resource = UserstatementResource::class;

    protected function getHeaderActions(): array
    {
        return [
            Actions\EditAction::make(),
        ];
    }
}
