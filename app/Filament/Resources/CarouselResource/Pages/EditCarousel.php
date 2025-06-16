<?php

namespace App\Filament\Resources\CarouselResource\Pages;

use App\Filament\Resources\CarouselResource;
use Filament\Actions;
use Filament\Resources\Pages\EditRecord;

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
        $originalImages = $this->record->getOriginal('path') ?? [];
        
        // Get new image data
        $newImages = $this->data['path'] ?? [];
        
        // Find images that were removed
        $removedImages = array_diff($originalImages, $newImages);
        
        // Delete removed images from storage
        foreach ($removedImages as $image) {
            if (Storage::disk('public')->exists($image)) {
                Storage::disk('public')->delete($image);
            }
        }
        
        // return redirect()->back()->withErrors($validator)->withInput();
    }

    protected function getRedirectUrl(): ?string
    {
        return static::getResource()::getUrl('index');
    }
}
