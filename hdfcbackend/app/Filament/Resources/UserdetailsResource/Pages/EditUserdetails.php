<?php

namespace App\Filament\Resources\UserdetailsResource\Pages;

use App\Filament\Resources\UserdetailsResource;
use Filament\Actions;
use Filament\Resources\Pages\EditRecord;

class EditUserdetails extends EditRecord
{
    protected static string $resource = UserdetailsResource::class;

    protected function getHeaderActions(): array
    {
        return [
            Actions\ViewAction::make(),
            Actions\DeleteAction::make(),
        ];
    }
}
