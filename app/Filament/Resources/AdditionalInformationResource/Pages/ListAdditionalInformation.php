<?php

namespace App\Filament\Resources\AdditionalInformationResource\Pages;

use App\Filament\Resources\AdditionalInformationResource;
use Filament\Actions;
use Filament\Resources\Pages\ListRecords;

class ListAdditionalInformation extends ListRecords
{
    protected static string $resource = AdditionalInformationResource::class;

    protected function getHeaderActions(): array
    {
        return [
            Actions\CreateAction::make(),
        ];
    }
}
