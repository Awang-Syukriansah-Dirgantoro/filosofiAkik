<?php

namespace App\Filament\Resources;

use App\Filament\Resources\AdditionalInformationResource\Pages;
use App\Filament\Resources\AdditionalInformationResource\RelationManagers;
use App\Models\AdditionalInformation;
use Filament\Forms;
use Filament\Forms\Form;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Table;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\SoftDeletingScope;

class AdditionalInformationResource extends Resource
{
    protected static ?string $model = AdditionalInformation::class;

    protected static ?string $navigationIcon = 'heroicon-o-rectangle-stack';

    protected static ?string $navigationLabel = 'Informasi Tambahan';
    protected static ?string $navigationGroup = 'Pengaturan';
    protected static bool $shouldRegisterNavigation = true;

    public static function form(Form $form): Form
    {
        return $form
            ->schema([
                Forms\Components\TextInput::make('phone_number')
                    ->label('Nomor Telepon')
                    ->tel()
                    ->required()
                    ->maxLength(255),
                Forms\Components\TextInput::make('facebook')
                    ->label('Facebook')
                    ->maxLength(255),
                Forms\Components\TextInput::make('instagram')
                    ->label('Instagram')
                    ->maxLength(255),
                Forms\Components\TextInput::make('tiktok')
                    ->label('TikTok')
                    ->maxLength(255),
                Forms\Components\TextInput::make('twitter')
                    ->label('Twitter/X')
                    ->maxLength(255),
                Forms\Components\TextInput::make('tag_line')
                    ->label('Tag Line')
                    ->maxLength(255),
                Forms\Components\TextInput::make('sub_tag_line')
                    ->label('Sub Tag Line')
                    ->maxLength(255),
                Forms\Components\Textarea::make('address')
                    ->label('Alamat')
                    ->required()
                    ->columnSpanFull(),
                Forms\Components\Textarea::make('about')
                    ->label('Tentang')
                    ->required()
                    ->columnSpanFull(),
            ]);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                Tables\Columns\TextColumn::make('phone_number')
                    ->label('Nomor Telepon')
                    ->searchable(),
                Tables\Columns\TextColumn::make('facebook')
                    ->label('Facebook')
                    ->searchable(),
                Tables\Columns\TextColumn::make('instagram')
                    ->label('Instagram')
                    ->searchable(),
                Tables\Columns\TextColumn::make('tiktok')
                    ->label('TikTok')
                    ->searchable(),
                Tables\Columns\TextColumn::make('twitter')
                    ->label('Twitter/X')
                    ->searchable(),
                Tables\Columns\TextColumn::make('tag_line')
                    ->label('Tag Line')
                    ->searchable(),
                Tables\Columns\TextColumn::make('sub_tag_line')
                    ->label('Sub Tag Line')
                    ->searchable(),
                Tables\Columns\TextColumn::make('created_at')
                    ->label('Dibuat Pada')
                    ->dateTime()
                    ->sortable()
                    ->toggleable(isToggledHiddenByDefault: true),
                Tables\Columns\TextColumn::make('updated_at')
                    ->label('Diperbarui Pada')
                    ->dateTime()
                    ->sortable()
                    ->toggleable(isToggledHiddenByDefault: true),
            ])
            ->filters([
                //
            ])
            ->actions([
                Tables\Actions\EditAction::make(),
                Tables\Actions\DeleteAction::make(),
            ])
            ->bulkActions([
                Tables\Actions\BulkActionGroup::make([
                    Tables\Actions\DeleteBulkAction::make(),
                ]),
            ]);
    }

    public static function getRelations(): array
    {
        return [
            //
        ];
    }

    public static function getPages(): array
    {
        return [
            'index' => Pages\ListAdditionalInformation::route('/'),
            'create' => Pages\CreateAdditionalInformation::route('/create'),
            'edit' => Pages\EditAdditionalInformation::route('/{record}/edit'),
        ];
    }

    public static function canCreate(): bool
    {
        return \App\Models\AdditionalInformation::count() === 0;
    }
}
