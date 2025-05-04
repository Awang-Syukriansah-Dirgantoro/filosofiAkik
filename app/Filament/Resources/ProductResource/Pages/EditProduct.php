<?php

namespace App\Filament\Resources\ProductResource\Pages;

use App\Filament\Resources\ProductResource;
use Filament\Actions;
use Filament\Resources\Pages\EditRecord;
use Illuminate\Support\Facades\Storage;

class EditProduct extends EditRecord
{
    protected static string $resource = ProductResource::class;

    protected function getHeaderActions(): array
    {
        return [
            Actions\DeleteAction::make(),
        ];
    }

    protected function beforeSave(): void
    {
        // Get original image data
        $originalImages = $this->record->getOriginal('image') ?? [];
        
        // Get new image data
        $newImages = $this->data['image'] ?? [];
        
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
