import { ThunkDispatch } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import type { RootState } from './store';

export const useAppDispatch = () => useDispatch<ThunkDispatch<any, any, any>>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
