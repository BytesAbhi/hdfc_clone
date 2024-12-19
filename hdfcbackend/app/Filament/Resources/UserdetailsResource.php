<?php

namespace App\Filament\Resources;

use App\Filament\Resources\UserdetailsResource\Pages;
use App\Filament\Resources\UserdetailsResource\RelationManagers;
use App\Models\Userdetails;
use Filament\Forms;
use Filament\Forms\Form;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Table;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\SoftDeletingScope;

class UserdetailsResource extends Resource
{
    protected static ?string $model = Userdetails::class;

    protected static ?string $navigationIcon = 'heroicon-o-rectangle-stack';

    public static function form(Form $form): Form
    {
        return $form
            ->schema([
                Forms\Components\TextInput::make('account_holders')
                    ->maxLength(255),
                Forms\Components\TextInput::make('nominee')
                    ->maxLength(255),
                Forms\Components\TextInput::make('branch')
                    ->maxLength(255),
                Forms\Components\TextInput::make('ifsc')
                    ->maxLength(255),
                Forms\Components\TextInput::make('mmid')
                    ->maxLength(255),
                Forms\Components\TextInput::make('virtual_payment_address')
                    ->maxLength(255),
                Forms\Components\TextInput::make('account_balance')
                    ->maxLength(255),
                Forms\Components\TextInput::make('required_monthly_average_balance')
                    ->maxLength(255),
                Forms\Components\TextInput::make('uncleared_funds')
                    ->maxLength(255),
                Forms\Components\TextInput::make('amount_on_hold')
                    ->maxLength(255),
                Forms\Components\TextInput::make('linked_cards'),
                Forms\Components\TextInput::make('spending_limit')
                    ->maxLength(255),
            ]);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                Tables\Columns\TextColumn::make('account_holders')
                    ->searchable(),
                Tables\Columns\TextColumn::make('nominee')
                    ->searchable(),
                Tables\Columns\TextColumn::make('branch')
                    ->searchable(),
                Tables\Columns\TextColumn::make('ifsc')
                    ->searchable(),
                Tables\Columns\TextColumn::make('mmid')
                    ->searchable(),
                Tables\Columns\TextColumn::make('virtual_payment_address')
                    ->searchable(),
                Tables\Columns\TextColumn::make('account_balance')
                    ->searchable(),
                Tables\Columns\TextColumn::make('required_monthly_average_balance')
                    ->searchable(),
                Tables\Columns\TextColumn::make('uncleared_funds')
                    ->searchable(),
                Tables\Columns\TextColumn::make('amount_on_hold')
                    ->searchable(),
                Tables\Columns\TextColumn::make('spending_limit')
                    ->searchable(),
                Tables\Columns\TextColumn::make('created_at')
                    ->dateTime()
                    ->sortable()
                    ->toggleable(isToggledHiddenByDefault: true),
                Tables\Columns\TextColumn::make('updated_at')
                    ->dateTime()
                    ->sortable()
                    ->toggleable(isToggledHiddenByDefault: true),
            ])
            ->filters([
                //
            ])
            ->actions([
                Tables\Actions\ViewAction::make(),
                Tables\Actions\EditAction::make(),
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
            'index' => Pages\ListUserdetails::route('/'),
            'create' => Pages\CreateUserdetails::route('/create'),
            'view' => Pages\ViewUserdetails::route('/{record}'),
            'edit' => Pages\EditUserdetails::route('/{record}/edit'),
        ];
    }
}
