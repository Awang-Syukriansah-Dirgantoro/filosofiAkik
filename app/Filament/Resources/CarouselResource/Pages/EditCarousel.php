<?php

namespace App\Filament\Resources\CarouselResource\Pages;

use App\Filament\Resources\CarouselResource;
use Filament\Actions;
use Filament\Resources\Pages\EditRecord;
use Illuminate\Support\Facades\Storage;

class EditCarousel extends EditRecord
{
    protected static string $resource = CarouselResource::class;

    protected function getHeaderActions(): array
    {
        return [
            Actions\ViewAction::make(),
            Actions\DeleteAction::make(),
        ];
    }

    protected function beforeSave(): void
    {
        // Get original image data
        $originalImage = $this->record->getOriginal('path');
        
        // Get new image data
        $newImage = $this->data['path'] ?? null;
        
        // Delete old image if it's different from new image
        if ($originalImage && $originalImage !== $newImage) {
            if (Storage::disk('public')->exists($originalImage)) {
                Storage::disk('public')->delete($originalImage);
            }
        }
    }

    protected function getRedirectUrl(): ?string
    {
        return static::getResource()::getUrl('index');
    }
}
