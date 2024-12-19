<?php

namespace App\Filament\Resources\UserstatementResource\Pages;

use App\Filament\Resources\UserstatementResource;
use Filament\Actions;
use Filament\Resources\Pages\EditRecord;

class EditUserstatement extends EditRecord
{
    protected static string $resource = UserstatementResource::class;

    protected function getHeaderActions(): array
    {
        return [
            Actions\ViewAction::make(),
            Actions\DeleteAction::make(),
        ];
    }
}
