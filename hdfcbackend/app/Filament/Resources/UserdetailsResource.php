<?php

namespace App\Filament\Resources;

use App\Filament\Resources\UserdetailsResource\Pages;
use App\Models\Userdetails;
use Filament\Forms;
use Filament\Forms\Form;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Table;
use Filament\Tables\Columns\TextColumn;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\Select;
use Filament\Forms\Components\Repeater;

class UserdetailsResource extends Resource
{
    protected static ?string $model = Userdetails::class;

    protected static ?string $navigationIcon = 'heroicon-o-rectangle-stack';

    public static function form(Form $form): Form
    {
        return $form
            ->schema([
                TextInput::make('account_holders')
                    ->maxLength(255)
                    ->nullable(),
                TextInput::make('nominee')
                    ->maxLength(255)
                    ->nullable(),
                TextInput::make('branch')
                    ->maxLength(255)
                    ->nullable(),
                TextInput::make('ifsc')
                    ->maxLength(255)
                    ->nullable(),
                TextInput::make('virtual_payment_address')
                    ->maxLength(255)
                    ->nullable(),
                Repeater::make('linked_cards')
                    ->collapsible()
                    ->label('Linked Cards')
                    ->schema([
                        TextInput::make('card_number')
                            ->label('Card Number')
                            ->helperText('Enter card number (will auto-format after every 4 digits).')
                            ->maxLength(19)
                            ->nullable()
                            ->reactive()
                            ->afterStateUpdated(function (\Filament\Forms\Set $set, $state) {

                                $formattedState = preg_replace('/(\d{4})(?=\d)/', '$1 ', $state);
                                $set('card_number', $formattedState);
                            }),
                        TextInput::make('expiry_month')
                            ->label('Expiry Month')
                            ->maxLength(2)
                            ->nullable(),
                        TextInput::make('expiry_year')
                            ->label('Expiry Year')
                            ->maxLength(4)
                            ->nullable(),
                        TextInput::make('cvv')
                            ->label('CVV')
                            ->maxLength(4)
                            ->nullable(),
                        Select::make('card_type')
                            ->label('Card Type')
                            ->options([
                                'debit' => 'Debit',
                                'credit' => 'Credit',
                                'rupay' => 'RuPay',
                                'prepaid' => 'Prepaid',
                            ])
                            ->nullable(),
                    ])
                    ->minItems(1)
                    ->maxItems(5)
                    ->required(),
                TextInput::make('spending_limit')
                    ->maxLength(255)
                    ->nullable(),
                TextInput::make('uncleared_funds')
                    ->maxLength(255)
                    ->nullable(),
                TextInput::make('amount_on_hold')
                    ->maxLength(255)
                    ->nullable(),
                TextInput::make('address')
                    ->maxLength(255)
                    ->nullable(),
                TextInput::make('city')
                    ->maxLength(255)
                    ->nullable(),
                TextInput::make('state')
                    ->maxLength(255)
                    ->nullable(),
                TextInput::make('account_balance')
                    ->maxLength(255)
                    ->nullable(),
                TextInput::make('required_monthly_average_balance')
                    ->maxLength(255)
                    ->nullable(),
                TextInput::make('phone_number')
                    ->maxLength(20)
                    ->nullable(),
                TextInput::make('od_limit')
                    ->maxLength(255)
                    ->nullable(),
                TextInput::make('currency')
                    ->maxLength(255)
                    ->nullable(),
                TextInput::make('email')
                    ->email()
                    ->maxLength(255)
                    ->nullable(),
                TextInput::make('customer_id')
                    ->maxLength(255)
                    ->nullable(),
                TextInput::make('account_no')
                    ->maxLength(255)
                    ->nullable(),
                Forms\Components\DatePicker::make('account_open_date')
                    ->nullable(),
                TextInput::make('account_status')
                    ->maxLength(255)
                    ->nullable(),
                TextInput::make('rtgs_neft_ifsc')
                    ->maxLength(255)
                    ->nullable(),
                TextInput::make('micr')
                    ->maxLength(255)
                    ->nullable(),
                TextInput::make('branch_code')
                    ->maxLength(255)
                    ->nullable(),
                TextInput::make('product_code')
                    ->maxLength(255)
                    ->nullable(),
            ]);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([

                TextColumn::make('account_holders')
                    ->searchable(),
                TextColumn::make('nominee')
                    ->searchable(),
                TextColumn::make('branch')
                    ->searchable(),
                TextColumn::make('ifsc')
                    ->searchable(),
                TextColumn::make('linked_cards')
                    ->formatStateUsing(function ($state) {

                        if (is_array($state) && count($state) > 0) {
                            $firstCard = $state[0];
                            return 'Card: ' . $firstCard['card_number'] . ' (' . $firstCard['card_type'] . ')';
                        }
                        return 'No cards linked';
                    })
                    ->searchable()
                    ->toggleable(),
                TextColumn::make('virtual_payment_address')
                    ->searchable(),
                TextColumn::make('spending_limit')
                    ->searchable(),
                TextColumn::make('uncleared_funds')
                    ->searchable(),
                TextColumn::make('amount_on_hold')
                    ->searchable(),
                TextColumn::make('address')
                    ->searchable(),
                TextColumn::make('city')
                    ->searchable(),
                TextColumn::make('state')
                    ->searchable(),
                TextInput::make('account_balance')
                    ->maxLength(255)
                    ->nullable(),
                TextInput::make('required_monthly_average_balance')
                    ->maxLength(255)
                    ->nullable(),
                TextColumn::make('phone_number')
                    ->searchable(),
                TextColumn::make('od_limit')
                    ->searchable(),
                TextColumn::make('currency')
                    ->searchable(),
                TextColumn::make('email')
                    ->searchable(),
                TextColumn::make('customer_id')
                    ->searchable(),
                TextColumn::make('account_no')
                    ->searchable(),
                TextColumn::make('account_open_date')
                    ->dateTime()
                    ->sortable(),
                TextColumn::make('account_status')
                    ->searchable(),
                TextColumn::make('rtgs_neft_ifsc')
                    ->searchable(),
                TextColumn::make('micr')
                    ->searchable(),
                TextColumn::make('branch_code')
                    ->searchable(),
                TextColumn::make('product_code')
                    ->searchable(),
                TextColumn::make('created_at')
                    ->dateTime()
                    ->sortable()
                    ->toggleable(isToggledHiddenByDefault: true),
                TextColumn::make('updated_at')
                    ->dateTime()
                    ->sortable()
                    ->toggleable(isToggledHiddenByDefault: true),
            ])
            ->filters([])
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
        return [];
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
