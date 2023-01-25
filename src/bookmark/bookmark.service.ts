import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateBookmarkDto, EditBookmarkDto } from './dto';

@Injectable()
export class BookmarkService {
    constructor(private prisma: PrismaService) {}

    getBookmarks(userId: number) {
        return this.prisma.bookmark.findMany({
            where: {
                userId
            }
        })
    }

    getBookmarkById(userId: number, bookmarkId: number) {
        return this.prisma.bookmark.findMany({
            where: {
                userId,
                id: bookmarkId
            }
        })
    }

    async createBookmark(userId: number, dto: CreateBookmarkDto) {
        return await this.prisma.bookmark.create({
            data: {
                userId,
                ...dto
            }
        })
    }

    async editBookmarkById(userId: number, bookmarkId: number, dto: EditBookmarkDto) {
        const bookmark = await this.prisma.bookmark.findUnique({
            where: {
                id: bookmarkId
            }
        })

        if (!bookmark || bookmark.userId !== userId) 
            throw new ForbiddenException()

        return await this.prisma.bookmark.update({
            where: {
                id: bookmarkId,

            },
            data: {
                ...dto
            }
        })
    }

    async deleteBookmarkById(userId: number, bookmarkId: number) {
        const bookmark = await this.prisma.bookmark.findUnique({
            where: {
                id: bookmarkId
            }
        })

        if (!bookmark || bookmark.userId !== userId) 
            throw new ForbiddenException()

        await this.prisma.bookmark.delete({
            where: {
                id: bookmarkId
            }
        })
    }
}
