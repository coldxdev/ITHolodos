"""Pagination schema"""
from __future__ import annotations
from typing import TypeVar, Generic, Sequence,  Optional
import math

from fastapi_pagination import Params
from fastapi_pagination.bases import AbstractPage, AbstractParams
from starlette.requests import Request
from pydantic import conint

T = TypeVar("T")


class Page(AbstractPage[T], Generic[T]):
    """
    Response model for paginated json list
    """
    results: Sequence[T]
    total: conint(ge=1)
    page: conint(ge=1)
    size: conint(ge=1)
    next: Optional[str] = None
    previous: Optional[str] = None
    first: Optional[str] = None
    last: Optional[str] = None

    __params_type__ = Params

    @classmethod
    def create(
            cls,
            items: Sequence[T],
            total: int,
            params: AbstractParams,
            request: Request
    ) -> Page[T]:
        """
        Creates page instance
        :param items: Sequence
        :param total: int
        :param params: Params
        :param request: Request
        :return: Page
        """
        if not isinstance(params, Params):
            raise ValueError("Page should be used with Params")

        last_page = math.ceil(total / params.size)
        prev_page = params.page - 1

        query_params = str(request.query_params)

        previous = (
            f"{request.url.path}?{query_params.replace(f'page={params.page}', f'page={prev_page}')}"
            if prev_page >= 1
            else None
        )

        following = (
            f"{request.url.path}?{query_params.replace(f'page={params.page}',f'page={params.page+1}')}"
            if params.page + 1 <= last_page
            else None
        )

        first = (
            f"{request.url.path}?{query_params.replace(f'page={params.page}',f'page=1')}"
            if params.page > 1
            else None
        )

        last = (
            f"{request.url.path}?{query_params.replace(f'page={params.page}',f'page={last_page}')}"
            if params.page != last_page and last_page > 0
            else None
        )

        return cls(results=items,
                   total=total,
                   page=params.page,
                   size=params.size,
                   next=following,
                   previous=previous,
                   first=first,
                   last=last,
                   )
