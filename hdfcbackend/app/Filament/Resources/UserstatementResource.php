<?php

namespace App\Filament\Resources;

use App\Filament\Resources\UserstatementResource\Pages;
use App\Models\Userstatement;
use App\Models\Userdetails;
use Filament\Forms;
use Filament\Forms\Form;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Table;

class UserstatementResource extends Resource
{
    protected static ?string $model = Userstatement::class;

    protected static ?string $navigationIcon = 'heroicon-o-rectangle-stack';

    public static function form(Form $form): Form
    {
        return $form
            ->schema([
                Forms\Components\Select::make('user_id')
                    ->label('Select User')
                    ->options(Userdetails::all()->pluck('account_holders', 'id'))
                    ->required(),
                Forms\Components\DatePicker::make('date')
                    ->required(),
                Forms\Components\TextInput::make('description')
                    ->required()
                    ->maxLength(255),
                Forms\Components\Select::make('transaction_type')
                    ->label('Transaction Type')
                    ->options([
                        'Credit' => 'Credit',
                        'Debit' => 'Debit',
                    ])
                    ->required(),
                Forms\Components\TextInput::make('amount')
                    ->required()
                    ->numeric(),
                Forms\Components\TextInput::make('balance')
                    ->label('Balance')
                    ->disabled()
                    ->numeric()
                    ->helperText('This balance will be auto-calculated based on the transaction.'),
            ])
            ->columns(2);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                Tables\Columns\TextColumn::make('id')
                    ->searchable(),
                Tables\Columns\TextColumn::make('user_id')
                    ->label('User')
                    ->getStateUsing(function ($record) {
                        return Userdetails::find($record->user_id)->account_holders ?? 'N/A';
                    })
                    ->sortable(),
                Tables\Columns\TextColumn::make('date')
                    ->date()
                    ->sortable(),
                Tables\Columns\TextColumn::make('description')
                    ->searchable(),
                Tables\Columns\TextColumn::make('transaction_type')
                    ->label('Type')
                    ->sortable(),
                Tables\Columns\TextColumn::make('amount')
                    ->numeric()
                    ->sortable(),
                Tables\Columns\TextColumn::make('balance')
                    ->numeric()
                    ->sortable(),
                Tables\Columns\TextColumn::make('ref_num')
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
            ->actions([
                Tables\Actions\ViewAction::make(),
                Tables\Actions\EditAction::make(),
            ])
            ->bulkActions([
                Tables\Actions\DeleteBulkAction::make(),
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
            'index' => Pages\ListUserstatements::route('/'),
            'create' => Pages\CreateUserstatement::route('/create'),
            'view' => Pages\ViewUserstatement::route('/{record}'),
            'edit' => Pages\EditUserstatement::route('/{record}/edit'),
        ];
    }

    /**
     * Hook into form submission to handle balance updates and ref_num generation.
     */
    public static function beforeCreate(array $data): array
    {
        $user = Userdetails::findOrFail($data['user_id']);
        $currentBalance = $user->account_balance;

        // Handle transaction type
        if ($data['transaction_type'] === 'Credit') {
            $data['balance'] = $currentBalance + $data['amount'];
        } elseif ($data['transaction_type'] === 'Debit') {
            if ($currentBalance < $data['amount']) {
                throw new \Exception('Insufficient balance for this transaction.');
            }
            $data['balance'] = $currentBalance - $data['amount'];
        }

        // Update user's balance
        $user->account_balance = $data['balance'];
        $user->save();

        // Generate ref_num
        $data['ref_num'] = strtoupper(uniqid('REF-'));

        return $data;
    }
}
