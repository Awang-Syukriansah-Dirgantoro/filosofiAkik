<?php

namespace App\Filament\Resources;

use App\Filament\Resources\ProductResource\Pages;
use App\Filament\Resources\ProductResource\RelationManagers;
use App\Models\Product;
use Filament\Forms;
use Filament\Forms\Form;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Table;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\SoftDeletingScope;
use Illuminate\Support\Facades\Storage;

class ProductResource extends Resource
{
    protected static ?string $model = Product::class;

    protected static ?string $navigationIcon = 'heroicon-o-rectangle-stack';

    public static function form(Form $form): Form
    {
        return $form
            ->schema([
                Forms\Components\TextInput::make('nama')
                    ->required()
                    ->maxLength(255),
                Forms\Components\TextInput::make('alias')
                    ->required()
                    ->maxLength(255),
                Forms\Components\TextInput::make('badge')
                    ->maxLength(255),
                Forms\Components\TextInput::make('stock')
                    ->required()
                    ->integer(),
                Forms\Components\TextInput::make('price')
                    ->required()
                    ->integer(),
                Forms\Components\Select::make('category')
                    ->multiple()
                    ->relationship('categories', 'name')
                    ->preload()
                    ->searchable()
                    ->options(function () {
                        return \App\Models\Category::pluck('name', 'id');
                    }),
                Forms\Components\Toggle::make('limited')
                    ->required(),
                Forms\Components\Toggle::make('negoable')
                    ->required(),
                Forms\Components\TextInput::make('number')
                    ->required()
                    ->maxLength(255),
                Forms\Components\DatePicker::make('date')
                    ->required(),
                Forms\Components\TextInput::make('weight')
                    ->required()
                    ->numeric(),
                Forms\Components\TextInput::make('diameter')
                    ->required()
                    ->maxLength(255),
                Forms\Components\TextInput::make('cut')
                    ->required()
                    ->maxLength(255),
                Forms\Components\TextInput::make('shape')
                    ->required()
                    ->maxLength(255),
                Forms\Components\TextInput::make('color')
                    ->required()
                    ->maxLength(255),
                Forms\Components\Textarea::make('comments'),
                Forms\Components\TextInput::make('origin')
                    ->required()
                    ->maxLength(255),
                Forms\Components\Textarea::make('description')
                    ->required(),
                Forms\Components\FileUpload::make('image')
                    ->multiple()
                    ->image()
                    ->acceptedFileTypes(['image/jpeg', 'image/jpg', 'image/png', 'image/gif'])
                    ->imageResizeMode('contain')
                    ->disk('public')
                    ->visibility('public')
                    ->directory('products')
                    ->maxSize(5120)
                    ->maxFiles(10)
                    // ->deleteUploadedFileUsing(function ($file) {
                    //     if (Storage::disk('public')->exists($file)) {
                    //         Storage::disk('public')->delete($file);
                    //         return true;
                    //     }
                    //     return false;
                    // })
                    ->columnSpanFull(),
            ]);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                Tables\Columns\TextColumn::make('nama'),
                Tables\Columns\TextColumn::make('stock'),
                Tables\Columns\TextColumn::make('price'),
                Tables\Columns\TextColumn::make('view'),
                Tables\Columns\IconColumn::make('limited')
                    ->boolean(),
                Tables\Columns\IconColumn::make('negoable')
                    ->boolean(),
                Tables\Columns\TextColumn::make('created_at')
                    ->dateTime(),
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
            'index' => Pages\ListProducts::route('/'),
            'create' => Pages\CreateProduct::route('/create'),
            'edit' => Pages\EditProduct::route('/{record}/edit'),
        ];
    }
}
